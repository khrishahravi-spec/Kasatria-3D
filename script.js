async function loadCSV() {
  const response = await fetch("https://docs.google.com/spreadsheets/d/1crSTk74mXX6i11vDQpUAqSJMEZITInkgYw2QK76Vaec/edit?usp=sharing");
  const text = await response.text();

  const rows = text.split("\n").slice(1);
  return rows.map(r => {
    const cols = r.split(",");
    return {
      name: cols[0],
      title: cols[1],
      netWorth: parseInt(cols[2]),
      country: cols[3]
    };
  });
}
