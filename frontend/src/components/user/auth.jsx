const users = [
  { id: "a201", password: "a201", name: "Kim" },
  { id: "sds", password: "sds", name: "Lee" },
];

export function loginCheck({ id, password }) {
  const user = users.find(
    (user) => user.id === id && user.password === password
  );
  if (user === undefined) throw new Error();
  return user;
}
