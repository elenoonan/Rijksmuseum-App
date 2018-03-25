//want to get input search working here ... currently not accessible
  let artistList = this.state.map(u =>{
    console.log('short List');
    const nameMatch = u.principalOrFirstMaker(this.state.searchText);
    return(nameMatch)?(
      <artistCard principalOrFirstMaker={u.principalOrFirstMaker} webImage={u.webImage} longTitle={u.longTitle}/>
    ) : null;
  });

  return(
    <section className="section">
      <LabelledInput name="searchText" label="Search by name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. vermeer"}/>
      <div className="columns is-multiline">
        {artistList}
      </div>
    </section>
  );
