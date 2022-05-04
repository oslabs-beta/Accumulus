
export async function fetchCount(): Promise<{ data: number }> {

  const response = await fetch('https://accumulus.s3.us-east-2.amazonaws.com/data/lambda/concurrency/sum/concurrency-sum-month.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  })
  const result = await response.json()
  console.log(result);
  return result
}