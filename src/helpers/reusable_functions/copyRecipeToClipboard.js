const copyRecipeToClipboard = async (id, type, setState) => {
  await navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
  setState(true);
};

export default copyRecipeToClipboard;
