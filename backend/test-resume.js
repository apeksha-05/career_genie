const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const baseURL = 'http://localhost:5000/api/v1';

const dummyPdfBase64 = "JVBERi0xLjQKJdPr6eEKMSAwIG9iaiAKPDwvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4gCmVuZG9iaiAKMiAwIG9iaiAKPDwvVHlwZSAvUGFnZXMgL0tpZHMgWzMgMCBSXSAvQ291bnQgMSA+PiAKZW5kb2JqIAozIDAgb2JqIAo8PC9UeXBlIC9QYWdlIC9QYXJlbnQgMiAwIFIgL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0gL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDQgMCBSPj4+PiAvQ29udGVudHMgNSAwIFIgPj4gCmVuZG9iaiAKNCAwIG9iaiAKPDwvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2E+PiAKZW5kb2JqIAo1IDAgb2JqIAo8PC9MZW5ndGggNDQ+PiBzdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3MDAgVGQKKEhlbGxvIFdvcmxkISBSZXN1bWUgamF2YXNjcmlwdCBweXRob24pIFRqCkVUCmVuZHN0cmVhbSAKZW5kb2JqIAp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA2NiAwMDAwMCBuIAowMDAwMDAwMTI5IDAwMDAwIG4gCjAwMDAwMDAyNDcgMDAwMDAgbiAKMDAwMDAwMDMzNiAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNiAvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0MzEKJSVFT0YK";

async function testUpload() {
  try {
    console.log('1. Creating a student user...');
    const userRes = await axios.post(`${baseURL}/auth/signup`, {
      name: 'Resume Tester',
      email: `tester${Date.now()}@test.com`,
      password: 'password123',
      role: 'student'
    });
    const token = userRes.data.data.token;

    console.log('2. Creating a dummy valid PDF...');
    const validPdfPath = path.join(__dirname, 'valid.pdf');
    fs.writeFileSync(validPdfPath, Buffer.from(dummyPdfBase64, 'base64'));

    console.log('3. Uploading the valid PDF...');
    const validFormData = new FormData();
    validFormData.append('resume', fs.createReadStream(validPdfPath));

    try {
      const validUploadRes = await axios.post(`${baseURL}/resumes/upload`, validFormData, {
        headers: {
          ...validFormData.getHeaders(),
          Cookie: `token=${token}`,
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Upload success response:', JSON.stringify(validUploadRes.data, null, 2));
    } catch (err) {
      console.log('Valid upload failed! Status:', err.response?.status);
      console.log('Error data:', err.response?.data || err.message);
    }

    console.log('4. Creating a dummy invalid PDF...');
    const invalidPdfPath = path.join(__dirname, 'invalid.pdf');
    fs.writeFileSync(invalidPdfPath, 'This is not a real PDF format file.');

    console.log('5. Uploading the invalid PDF...');
    const invalidFormData = new FormData();
    invalidFormData.append('resume', fs.createReadStream(invalidPdfPath));

    try {
      const invalidUploadRes = await axios.post(`${baseURL}/resumes/upload`, invalidFormData, {
        headers: {
          ...invalidFormData.getHeaders(),
          Cookie: `token=${token}`,
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Invalid upload success response (Unexpected!):', invalidUploadRes.data);
    } catch (err) {
      console.log('Invalid upload failed as expected. Status:', err.response?.status);
      console.log('Error data:', err.response?.data);
    }

    fs.unlinkSync(validPdfPath);
    fs.unlinkSync(invalidPdfPath);
    console.log('Done.');
  } catch (error) {
    console.error('Test script error:', error.message);
  }
}

testUpload();
