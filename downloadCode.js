#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';
import path from 'path';

const VIZHUB_EXPORTS_DIR = 'vizhub-exports';

// List of VizHub visualization page URLs to download and unzip
// These become subdirectories within VIZHUB_EXPORTS_DIR,
// and also have corresponding images
// e.g. 'https://vizhub.com/curran/pseudo-scatter-plot-with-html'
// leads to 'figures/pseudo-scatter-plot-with-html.png'
const vizList = [
  'https://vizhub.com/curran/react-d3-starter',
  'https://vizhub.com/curran/cv-pseudo-scatter-plot',
  'https://vizhub.com/curran/cv-clickable-circles',
  'https://vizhub.com/curran/cv-loading-csv-data',
  'https://vizhub.com/curran/cv-scatter-plot',
  'https://vizhub.com/curran/cv-line-chart',

];

async function downloadAndUnzip(
  downloadUrl,
  localZipFilename,
  unzipTargetDirectory,
) {
  // Download
  console.log(
    `Downloading from ${downloadUrl} to ${localZipFilename}...`,
  );
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(localZipFilename);
    https
      .get(downloadUrl, (response) => {
        // Follow redirects
        if (
          response.statusCode === 301 ||
          response.statusCode === 302 ||
          response.statusCode === 307
        ) {
          console.log(`Redirected to ${response.headers.location}`);
          https.get(response.headers.location, (res) => {
            if (res.statusCode !== 200) {
              file.close(() => {
                fs.unlink(localZipFilename, (err) => {
                  if (err)
                    console.error(
                      `Error deleting partial zip file after redirect: ${err.message}`,
                    );
                });
                reject(
                  new Error(
                    `Failed to download file after redirect: HTTP status code ${res.statusCode}`,
                  ),
                );
              });
              return;
            }
            res.pipe(file);
          });
        } else if (response.statusCode !== 200) {
          file.close(() => {
            fs.unlink(localZipFilename, (err) => {
              if (err)
                console.error(
                  `Error deleting partial zip file: ${err.message}`,
                );
            });
            reject(
              new Error(
                `Failed to download file: HTTP status code ${response.statusCode}`,
              ),
            );
          });
          return;
        } else {
          response.pipe(file);
        }

        file.on('finish', () => {
          file.close(resolve);
          console.log(`${localZipFilename} downloaded successfully.`);
        });
      })
      .on('error', (err) => {
        fs.unlink(localZipFilename, (unlinkErr) => {
          if (unlinkErr)
            console.error(
              `Error deleting partial zip file during https.get error: ${unlinkErr.message}`,
            );
        });
        reject(new Error(`Error during download: ${err.message}`));
      });
  });

  // Unzip
  console.log(
    `Unzipping ${localZipFilename} to ${unzipTargetDirectory}...`,
  );
  execSync(
    `unzip -o "${localZipFilename}" -d "${unzipTargetDirectory}"`,
    {
      stdio: 'inherit',
    },
  );
  console.log(
    `${localZipFilename} unzipped successfully to ${unzipTargetDirectory}.`,
  );

  // Remove Zip
  console.log(`Removing ${localZipFilename}...`);
  fs.unlinkSync(localZipFilename);
  console.log(`${localZipFilename} removed successfully.`);
}

async function main() {
  try {
    // 1. Clean and recreate VIZHUB_EXPORTS_DIR
    console.log(`Cleaning directory: ${VIZHUB_EXPORTS_DIR}...`);
    fs.rmSync(VIZHUB_EXPORTS_DIR, {
      recursive: true,
      force: true,
    });
    fs.mkdirSync(VIZHUB_EXPORTS_DIR, { recursive: true }); // Ensure it exists for -d target
    console.log(
      `Directory ${VIZHUB_EXPORTS_DIR} cleaned and recreated.`,
    );

    // Download and unzip individual visualizations from vizList
    for (const vizPageURL of vizList) {
      console.log(`Processing ${vizPageURL}...`);
      const parts = vizPageURL.split('/');
      if (parts.length < 2) {
        console.warn(
          `Skipping invalid URL (not enough parts): ${vizPageURL}`,
        );
        continue;
      }
      const user = parts[parts.length - 2];
      const slug = parts[parts.length - 1];

      if (!user || !slug) {
        console.warn(
          `Skipping invalid URL (could not parse user/slug): ${vizPageURL}`,
        );
        continue;
      }

      const apiDownloadURL = `https://vizhub.com/api/get-viz/${user}/${slug}.zip`;
      const localZipFilename = `${slug}.zip`; // Temporary local name for the zip file

      const vizSpecificPath = path.join(VIZHUB_EXPORTS_DIR, slug);
      fs.mkdirSync(vizSpecificPath, { recursive: true }); // Ensure the target directory exists

      // Each viz will be unzipped into its own subdirectory within VIZHUB_EXPORTS_DIR
      await downloadAndUnzip(
        apiDownloadURL,
        localZipFilename,
        vizSpecificPath,
      );
    }

    console.log('All operations completed successfully.');
  } catch (error) {
    console.error('An error occurred:', error.message);
    if (error.stderr) {
      console.error('Stderr:', error.stderr.toString());
    }
    if (error.stdout) {
      console.error('Stdout:', error.stdout.toString());
    }
    process.exit(1);
  }
}

main();
