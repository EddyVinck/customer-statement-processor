const main = async (): Promise<void> => {
  console.log("TODO");
};

try {
  void main();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
