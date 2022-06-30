const copyRecipeToClipboard = async (id, setState, type) => {
  if (type === 'drinks') {
    await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
  } else {
    await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
  }
  setState(true);
};

export default copyRecipeToClipboard;
