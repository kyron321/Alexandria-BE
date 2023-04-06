import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1' 
});

const dynamodb = new AWS.DynamoDB();

const tableName = 'alexandria-test';

dynamodb.deleteTable({ TableName: tableName }, (err, data) => {
  if (err) {
    console.error('Error deleting table:', err);
  } else {
    console.log(`Table ${tableName} deleted successfully`);
  }
});
