import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles/RegistrationPage.module.css";

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Used to clear the form after submission
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(`🎉 Registration Successful!\n\nName: ${data.name}\nEmail: ${data.email}`);
    reset(); // Clear the form
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input {...register("name")} className={styles.input} />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input {...register("email")} className={styles.input} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" {...register("password")} className={styles.input} />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input type="password" {...register("confirmPassword")} className={styles.input} />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}
