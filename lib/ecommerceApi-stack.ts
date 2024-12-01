import * as cdk from 'aws-cdk-lib';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cwlogs from 'aws-cdk-lib/aws-logs';

import { Construct } from 'constructs';

interface EcommerceApiStackProps extends cdk.StackProps {
  readonly productsFetchHandler: lambdaNodejs.NodejsFunction;
}

export class EcommerceApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props);

    const logGroup = new cwlogs.LogGroup(this, 'EcommerceApiLogs')
    
    const api = new apigateway.RestApi(this, 'EcommerceApi', {
      restApiName: 'EcommerceApi',
      deployOptions: {
        accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
          caller: true,
          httpMethod: true,
          ip: false,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          user: false
        })
      }
    })

    const productsFetchIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler);

    // /products
    const productsResource = api.root.addResource('products');
    productsResource.addMethod('GET', productsFetchIntegration);
  }
}

