import * as S3 from '../clients/s3';

const s3 = new S3({
    region: 'us-west-2'
});

function test1() {
    s3.selectObjectContent({
        Bucket: 'foo',
        Expression: 'select * from s3object',
        ExpressionType: 'SQL',
        Key: 'bar.gz',
        InputSerialization: {
        },
        OutputSerialization: {}
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            if (Array.isArray(data.Payload)) {
                data.Payload.map(function(event) {
                    if (event.Stats) {
                        console.log(event.Stats.Details);
                    } else if (event.Records) {
                        event.Records.Payload;
                    }
                });
            } else {
                data.Payload!.on('data', function(event) {
                    if (event.Stats) {
                        console.log(event.Stats.Details);
                    }
                });
                data.Payload!.on('end', function() {});
            }
        }
    });
}