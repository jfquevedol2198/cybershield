// utils/userDataFactory.js

const createUserData = ({
  country,
  zipCode,
  state,
  city,
  jobTitle,
  firstName,
  email,
  manager,
  lastName,
  middleName,
  phone,
  is_manager,
}) => {
  return {
    country: country || '',
    zip: zipCode || '',
    active: true,
    state: state || '',
    city: city || '',
    title: jobTitle || '',
    sys_class_name: "sys_user",
    first_name: firstName || '',
    email: email || '',
    manager: manager || '',
    last_name: lastName || '',
    middle_name: middleName || '',
    home_phone: "-",
    phone: phone || '',
    name: "-",
    user_name: email ? email.slice(0, email.indexOf("@")) : '',
    mobile_phone: "-",
    street: "-",
    company: "Cybershield",
    department: "Department",
    location: country || '',
    is_manager : is_manager || false,
  };
};

export default createUserData;
