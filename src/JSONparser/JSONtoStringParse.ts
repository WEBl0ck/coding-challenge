function JSONtoStringParse(firstJSON: any, secondJSON: any) {
  let x = "";

  // loop through the first object and concat all data from it to x variable
  for (let a in firstJSON) {
    x = x.concat(` - "${a}": "${firstJSON[a]}", \n`);
  }

  // loop through the second object
  for (let b in secondJSON) {
    // if we have duplicates we replace them and remove minus
    if (x.match(`"${b}": "${secondJSON[b]}",`)) {
      const re = RegExp(`- "${b}": "${secondJSON[b]}"`, "gi");
      x = x.replace(re, `"${b}": "${secondJSON[b]}"`);
    }

    // if duplicates not found we just concat data from second object and add plus
    if (!x.match(`"${b}": "${secondJSON[b]}",`)) {
      x = x.concat(`+ "${b}": "${secondJSON[b]}", \n`);
    }
  }

  return `{${x}}`;
}

export default JSONtoStringParse;
