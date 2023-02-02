function getARandomTeacherImageName() {
  const prefix = "Teacher_";
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  return prefix + randomNum;
}

function getARandomTeacherName() {
  const prefix = "Teacher_";
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  return prefix + randomNum;
}

export { getARandomTeacherImageName, getARandomTeacherName };
