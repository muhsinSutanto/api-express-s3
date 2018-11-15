const AWS = require('aws-sdk')
const fs = require('fs')
const fileType = require('file_type')

AWS.config.update({
    accessKeyId: process.env.AWS_SECRET_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY

})

AWS.config.setPromisesDependency(Promise)

const S3 = new AWS.S3()

async function uploadImage(image) {
    try {
        const buffer = fs.readFileSync(image)
        const type = fileType(image)
        const params = {
            ACL : 'public-read',
            Body: buffer,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            contentType: type.mime,
            key: `${Date.now().toString()}.${type.ext}`
        }

        const data = await S3.upload(params).promise()

        return data
    } catch (error) {
        return error      
    }  
}

async function deleteImage (image) {
    try {
        const params = {
            Bucket : process.env.AWS_S3_BUCKET_NAME,
            key: image
        }

        const data = await S3.deleteObject(params).promise()

        return data
        
    } catch (error) {
        return error
        
    }
}

module.exports = {
    uploadImage,
    deleteImage
}