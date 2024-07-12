const [passAlert, setPassAlert] = useState(false);
const [nameAlert, setNameAlert] = useState(false);
const [ageAlert, setAgeAlert] = useState(false);
const [passRegex, setPassRegex] = useState(false);
const [hasError, setHasError] = useState(false);

const onSubmit = async (e) => {
  e.preventDefault();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

  if (user.password !== user.confirmpassword) {
    setPassAlert(true);
    setTimeout(() => {
      setPassAlert(false);
      setHasError(false);
    }, 3000);
    setHasError(true);
  } else if (name.name === "" || lname.lname === "") {
    setHasError(true);
    setNameAlert(true);
    setNameAlert(() => {
      setPassAlert(false);
      setHasError(false);
    }, 3000);
  } else if (age.age === "") {
    setHasError(true);
    setAgeAlert(true);
    setTimeout(() => {
      setAgeAlert(false);
      setHasError(false);
    }, 3000);
  } else if (!passwordRegex.test(user.password)) {
    setHasError(true);
    setPassRegex(true);
    setTimeout(() => {
      setPassRegex(false);
      setHasError(false);
    }, 3000);
  }

  if (hasError) return;

  try {
    const doc = await addDoc(usersRef, {
      name: name.name,
      lname: lname.lname,
      email: user.email,
    });
    console.log(doc);

    await createUserWithEmailAndPassword(auth, user.email, user.password);
    setSucessSingin(true);
    navigate("/login");
  } catch (error) {
    console.log("Something wrong");
    console.error(error);
  }
};
