console.log('ID\tTitle');
'.'.repeat(50).split('.').map((_, index) => {
  const id = '0'.repeat(5 - index.toString().length) + index.toString();
  console.log(`${id}\t${id}`);
});
