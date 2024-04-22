const express = require("express");

const app = express();

app.get("/mean/", function (req, res) {
  let nums = req.query.nums.split(",");
  if (!nums) {
    return res.status(400).json({ error: "nums is required" });
  }
  let total = 0;
  nums.forEach((num) => {
    if (isNaN(num)) {
      return res.status(400).json({ error: `${num} is not a number` });
    } else {
      total += parseInt(num);
    }
  });
  return res.json({ operation: "mean", value: total / nums.length });
});

app.get("/median", function (req, res) {
  let nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: "nums is required" });
  }
  const sortedArray = nums.split(",").sort((a, b) => a - b);
  const midIndex = Math.floor(sortedArray.length / 2);
  for (let i = 0; i < sortedArray.length; i++) {
    if (isNaN(sortedArray[i])) {
      return res
        .status(400)
        .json({ error: `${sortedArray[i]} is not a number` });
    } else {
    }
  }
  if (sortedArray.length % 2 === 0) {
    return res.json({
      operation: "median",
      value:
        (parseInt(sortedArray[midIndex - 1]) +
          parseInt(sortedArray[midIndex])) /
        2,
    });
  } else {
    return res.json({ operation: "median", value: sortedArray[midIndex] });
  }
});

app.get("/mode", function (req, res) {
  let nums = req.query.nums.split(",");
  if (!nums) {
    return res.status(400).json({ error: "nums is required" });
  }
  let counts = {};
  nums.forEach((num) => {
    if (isNaN(num)) {
      return res.status(400).json({ error: `${num} is not a number` });
    } else {
      if (counts[num]) {
        counts[num] += 1;
      } else {
        counts[num] = 1;
      }
    }
  });
  let maxCount = 0;
  let mostFrequentnum;
  for (let num in counts) {
    if (counts[num] > maxCount) {
      maxCount = counts[num];
      mostFrequentnum = num;
    }
  }
  return res.json({
    operation: "mode",
    value: mostFrequentnum,
  });
});
module.exports = app;
// http://localhost:3000/
app.listen(3000, function () {
  console.log("App on port 3000");
});
