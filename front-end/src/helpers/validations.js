const validations = {
  cpf(strCPF) {
    let numsStr = strCPF.replace(/[^0-9]/g, "");
    let sum;
    let rest;
    sum = 0;
    if (
      strCPF == "00000000000" ||
      strCPF == "11111111111" ||
      strCPF == "22222222222" ||
      strCPF == "33333333333" ||
      strCPF == "44444444444" ||
      strCPF == "55555555555" ||
      strCPF == "66666666666" ||
      strCPF == "77777777777" ||
      strCPF == "88888888888" ||
      strCPF == "99999999999"
    )
      return false;

    if (numsStr.length !== 11) return false;

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(numsStr.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(numsStr.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(numsStr.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(numsStr.substring(10, 11))) return false;
    return true;
  },
  cnpj(cnpj) {
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var c = String(cnpj).replace(/[^\d]/g, "");

    if (c.length !== 14) return false;

    if (/0{14}/.test(c)) return false;

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if (c[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if (c[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

    return true;
  },
  email(strEmail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      strEmail
    );
  },
};

export default validations;
