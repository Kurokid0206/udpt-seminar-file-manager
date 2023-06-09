import boto3
from fileManager.configs.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY


def uploadFile2S3(file, pre_key):

    aws_credentials = {
        'aws_access_key_id': AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': AWS_SECRET_ACCESS_KEY
    }

    file_key = f'{pre_key}/{file.name}'
    if file_key[0] == '/':
        file_key = file_key[1:]
    s3 = boto3.resource('s3', **aws_credentials)
    s3_uploaded_url = s3.Bucket('ti-pt-demo').put_object(Key=file_key,
                                                         Body=file, ContentType=file.content_type)
    print(f'done: {file.name} :D')
    return s3_uploaded_url
