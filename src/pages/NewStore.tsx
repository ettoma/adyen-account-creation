function NewStore() {
  return (
    <>
      <h2>New Store</h2>
      {/* dropdown for account country: EU or UK */}
      <label>Account Country</label>
      <select>
        <option value="EU">EU</option>
        <option value="UK">UK</option>
      </select>
    </>
  );
}

export default NewStore;
