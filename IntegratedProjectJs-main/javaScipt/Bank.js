const addAccBtn = document.querySelector('#add-movie-btn');
const addAcc = document.getElementById('add-acc');
const addbackdrop = document.getElementById('backdrop');
const LoginBack = document.getElementById('login');
const welComeMsg = document.getElementById('entry-text');
const logout = document.querySelector('#logout-movie-btn');
const bankBalance = document.getElementById('bankBalance');
const boxVisible = document.getElementById("boxes");
const wBtn = document.getElementById('wAmtBtn');
const dBtn = document.getElementById('dAmtBtn');

class user {
  constructor(firstName, lastName, mobileNO, city, email, password, amount) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNO = mobileNO;
    this.city = city;
    this.email = email;
    this.password = password;
    this.amount = amount;
  }
}
let valid = -1;
const d = document;
let users = [
  new user(
    'harshil',
    'modh',
    1236547890,
    'Mahesana',
    'Hrshil@gmail.com',
    'harshil@123',
    25000
  ),
  new user(
    'Ronak',
    'Chaudhary',
    9988775522,
    'HMT',
    'ronak@gmail.com',
    'ronak@123',
    25000
  ),
  new user('Diya', 'Shah', 9874563210, "A'bad", 'diya@gmail.com', 'diya@1234',25000),
];

const clearInput = () => {
  d.getElementById('fName').value = '';
  d.getElementById('lName').value = '';
  d.getElementById('mNO').value = '';
  d.getElementById('city').value = '';
  d.getElementById('email').value = '';
  d.getElementById('password').value = '';
  d.getElementById('amount').value = '';
};
const addAccount = () => {
  addAcc.classList.toggle('visible');
  addbackdrop.classList.toggle('visible');
  if (valid < 0) LoginBack.classList.toggle('visible');
};

const logoutbtn = () => {
  addAccBtn.classList.toggle('visible');
  document.getElementById('logout-movie-btn').classList.toggle('visible');
};
const addUser = () => {
  let flag = false;
  let EmailFlag = false;
  var mailformat = /^([a-zA-z0-9.])+@([a-zA-z])+\.([a-zA-z.]){2,6}$/;
  var PassFormat = /^(?=.*[\d])(?=.*[!@#$%^&*.])[\w!@#$%^&*.]{8,16}$/;
  let fName = d.getElementById('fName').value;
  let lName = d.getElementById('lName').value;
  let number = d.getElementById('mNO').value;
  let city = d.getElementById('city').value;
  let email = d.getElementById('email').value;
  let pass = d.getElementById('password').value;
  let amount = d.getElementById('amount').value;


  if (lName.trim() === '' || lName.length < 3) {
    d.getElementById('lNameE').innerText = '* Enter the LastName';
    flag = true;
  } else {
    d.getElementById('lNameE').innerText = '';
  }

  if (fName.trim() === '' || fName.length < 4) {
    d.getElementById('fNameE').innerText = '* Enter the FirstName';
    flag = true;
  } else {
    d.getElementById('fNameE').innerText = '';
  }

  if (number.length != 10) {
    d.getElementById('mNOE').innerText = '* Enter the 10 digit mobile number';
    flag = true;
  } else {
    d.getElementById('mNOE').innerText = '';
  }
  if (city.trim() === '' || city.length < 3) {
    d.getElementById('cityE').innerText = '* Enter valid city';
    flag = true;
  } else {
    d.getElementById('cityE').innerText = '';
  }
  if (email.trim() === '' || !email.match(mailformat) || email.length < 3) {
    d.getElementById('emailE').innerText = '* Enter valid email';
    flag = true;
  } else {
    d.getElementById('emailE').innerText = '';
  }

  users.forEach(arr=>{
    if(arr.email === email.trim())
      EmailFlag = true;
  })

  if(EmailFlag){
    d.getElementById('emailE').innerText = '* EmailId is already Exist....';
    flag = true;
  }

  if (pass.trim() === '' || !pass.match(PassFormat) || pass.length < 3) {
    d.getElementById('passE').innerText = '* weak password....';
    flag = true;
  } else {
    d.getElementById('passE').innerText = '';
  }

  if (amount < 10000) {
    d.getElementById('amtE').innerText = '* Enter valid amount ,minimum 10k ';
    flag = true;
  } else {
    d.getElementById('amtE').innerText = '';
  }

  if (flag === false) {
    users.push(new user(fName, lName, number, city, email, pass,amount));
    addAccount();
    alert('Account Opened....');
    clearInput();
  }
};

const balanceUpdate = () =>{
  bankBalance.innerText = '$ ' + users[valid].amount
}
const clearLoginInputs = () => {
  d.getElementById('l_id').value = '';
  d.getElementById('l_pass').value = '';
  d.getElementById('l_id').focus();
};

const loginBackDrop = () => {
  LoginBack.classList.toggle('visible');
  welComeMsg.classList.toggle('visible');
  document.getElementById('wcMsg').innerText =
    'WELCOME ' + users[valid].firstName.toUpperCase();
  balanceUpdate()
  boxVisible.classList.toggle('visible')
};

const checkLogin = () => {
  l_user = d.getElementById('l_id').value.toLowerCase();
  l_pass = d.getElementById('l_pass').value;
  users.forEach((arr, index) => {
    if (arr.email === l_user && arr.password === l_pass) valid = index;
  });
  if (valid < 0) {
    d.getElementById('inValid').innerText = 'Wrong cradencials......';
    d.getElementById('l_id').value = '';
    d.getElementById('l_pass').value = '';
    d.getElementById('l_id').focus();
  } else {
    alert('login Succesfully.......');
    loginBackDrop();
    clearLoginInputs();
    logoutbtn();
  }
};

const logoutUser = () => {
  valid = -1;
  LoginBack.classList.toggle('visible');
  welComeMsg.classList.toggle('visible');
  boxVisible.classList.toggle('visible')
  logoutbtn();
};

const withdrawal = () =>{
    amount = document.getElementById('wAmount').value
    if(amount > users[valid].amount)
      document.getElementById('wAmtE').innerText = "Enter amount is grater then your balance..."
    else{
      users[valid].amount -= amount;
      alert(amount + "  withdrawal successfully")
      balanceUpdate()
      document.getElementById('wAmtE').innerText = "";
      document.getElementById('wAmount').value = '';
    }
}

const deposit = () =>{
  amount = document.getElementById('dAmount').value;
  users[valid].amount += parseInt(amount);
  alert(amount + "  deposit successfully")
  balanceUpdate()
  document.getElementById('dAmount').value = '';
}
dBtn.addEventListener('click',deposit)
wBtn.addEventListener('click',withdrawal)
addAccBtn.addEventListener('click', addAccount);
logout.addEventListener('click', logoutUser);
