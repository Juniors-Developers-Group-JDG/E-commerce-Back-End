import * as Yup from 'yup'

export const UserValidation = Yup.object().shape({
  name: Yup.string().required('campo obrigatório'),
  email: Yup.string()
    .test('email', 'e-mail inválido', (value) => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || '')
    })
    .required('campo obrigatório'),
  password: Yup.string().required('campo obrigatório'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas não conferem',
  ),
  profilePhoto: Yup.string(),
})
