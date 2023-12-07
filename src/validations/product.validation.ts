import * as Yup from 'yup'

export const ProductValidation = Yup.object().shape({
  name: Yup.string().required('campo obrigatório'),
  description: Yup.string().required('campo obrigatório'),
  price: Yup.number()
    .typeError('campo precisa ser do tipo number')
    .required('campo obrigatório'),
  images: Yup.array()
    .typeError('o campo images precisa ser um array')
    .required('campo obrigatório'),
  amount: Yup.number()
    .typeError('campo precisa ser do tipo number')
    .required('campo obrigatório'),
  discount: Yup.number()
    .typeError('campo precisa ser do tipo number')
    .required('campo obrigatório'),
  category: Yup.array()
    .typeError('o campo images precisa ser um array')
    .required('campo obrigatório'),
})
