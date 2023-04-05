import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

const dynamoDb = new AWS.DynamoDB();

const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'category',
        AttributeType: 'S'
      },
      {
        AttributeName: 'title',
        AttributeType: 'S'
      },
      {
        AttributeName: 'author',
        AttributeType: 'S'
      },
      {
        AttributeName: 'subcategory',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'category',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'title',
        KeyType: 'RANGE'
      }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'title-author-index',
        KeySchema: [
          {
            AttributeName: 'title',
            KeyType: 'HASH'
          },
          {
            AttributeName: 'author',
            KeyType: 'RANGE'
          }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'category-subcategory-index',
        KeySchema: [
          {
            AttributeName: 'category',
            KeyType: 'HASH'
          },
          {
            AttributeName: 'subcategory',
            KeyType: 'RANGE'
          }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: 'alexandria-test'
  };
  

dynamoDb.createTable(params, (err, data) => {
  if (err) {
    console.log('Error creating table:', err);
  } else {
    console.log('Table created:', data);
  }
});
