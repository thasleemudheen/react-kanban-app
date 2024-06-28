// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = (values) => {
//   console.log('Success:', values);
//   const {username,Password}=values
//   console.log(username)
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
// const Login = () => (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//       <h2 className="text-5xl font-bold mb-6 text-center">Sign Up Form</h2>
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[{ required: true, message: 'Please input your username!' }]}
//         >
//           <Input className="w-1/3" />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//         >
//           <Input className="w-1/3" />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password className="w-1/3" />
//         </Form.Item>

//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Button type="primary" htmlType="submit" className="w-1/3">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   </div>
// );
// export default Login;