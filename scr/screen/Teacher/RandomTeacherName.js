function getARandomTeacherImageName() {
  const prefix = "Teacher_";
  const randomNum = Math.random();
  return prefix + randomNum;
}

function getARandomTeacherName() {
  const prefix = "Teacher_";
  const randomNum = Math.random();
  return prefix + randomNum;
}

export { getARandomTeacherImageName, getARandomTeacherName };
