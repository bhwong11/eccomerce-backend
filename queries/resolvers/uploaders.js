const s3 = require('./s3');
const config = require('./config');
const {
  S3Uploader,
  FilesystemUploader,
} = require('./gql-uploaders');

const s3ImageUploader = new S3Uploader(s3, { // (A)
  baseKey: 'products/images',
  uploadParams: {
    CacheControl: 'max-age:31536000',
    ContentDisposition: 'inline',
  },
});

const fsImageUploader = new FilesystemUploader({ // (A)
  dir: config.app.storageDir, // (B)
  filenameTransform: filename => `${Date.now()}_${filename}`, // (C)
});

module.exports = { imageUploader: fsImageUploader }; // (A)
