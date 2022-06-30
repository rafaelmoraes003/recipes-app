const copyRecipeToClipboard = async (id, setState) => {
  await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
  setState(true);
};

export default copyRecipeToClipboard;
