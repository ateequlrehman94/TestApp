function getARandomstudentImageName() {
  const prefix = "Student_";
  const randomNum = Math.random();
  return prefix + randomNum;
}

function getARandomstudentName() {
  const prefix = "Student_";
  const randomNum = Math.random();
  return prefix + randomNum;
}

export { getARandomstudentImageName, getARandomstudentName };
