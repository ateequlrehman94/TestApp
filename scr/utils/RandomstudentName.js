function getARandomstudentImageName() {
  const prefix = "Student_";
  const randomNum = Math.floor(Math.random() * 100) + 1;
  return prefix + randomNum;
}

function getARandomstudentName() {
  const prefix = "Student_";
  const randomNum = Math.floor(Math.random() * 100) + 1;
  return prefix + randomNum;
}

export { getARandomstudentImageName, getARandomstudentName };
