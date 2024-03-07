function transform(data, daysInPast){
    /**
     * Splits the response by row and column, returning a 2D array.
     */
    // Cleanup the data
    const transformedData = data.trim().split('\n').map(data => {return data.split(',')})
    // Initialize 2D array and date cursor
    let plotDataThirtyDays = {xAxis: [], yAxis: []}
    let latestDate = new Date();

    for (let index = 1; index < transformedData.length; index++) {
      // Initialize an empty rowData array and set the element variable to the current row
      const element = transformedData[index];
      let rowData = []

      // Push each element in the row to the rowData variable
      for (let i = 0; i < element.length; i++) {
        rowData.push(element[i])
      }
      // The first index will have the date cursor value.
      if (index === 1) {
        latestDate = new Date(rowData[0])
        latestDate.setDate(latestDate.getDate() - (daysInPast != null ? daysInPast : 30))
      }
      // Only push values for dates greater than or equal to the cursor date
      if (new Date(rowData[0]) >= latestDate){
        plotDataThirtyDays.xAxis.push(new Date(rowData[0]))
        plotDataThirtyDays.yAxis.push(rowData[4])
      }
    }
    // Data provided by the api is in descending order which MUI doesn't like. 
    plotDataThirtyDays.xAxis = plotDataThirtyDays.xAxis.reverse()
    plotDataThirtyDays.yAxis = plotDataThirtyDays.yAxis.reverse()

    return plotDataThirtyDays
}

function Transforms(data, daysInPast){
    return transform(data, daysInPast)
}

export default Transforms;
