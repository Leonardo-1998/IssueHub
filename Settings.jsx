import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getMy, updateMy } from "../services/UserService";
import { showErrorToast, showSuccessToast } from "../utils/toastify";
import { updateMyProfileValidation } from "../validations/UserValidation";
import Loading from "./Loading";

const Settings = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch current user data
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: () => getMy(axiosPrivate),
    enabled: !!axiosPrivate,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateMyProfileValidation),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password for validation
  const watchPassword = watch("password");

  // Reset form when user data loads
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        email: currentUser.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [currentUser, reset]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (profileData) => updateMy(axiosPrivate, profileData),
    onSuccess: (response) => {
      showSuccessToast("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
      // Clear password fields
      reset({
        name: response.data.name,
        email: response.data.email,
        password: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      console.error("Profile update error:", error);
      const message =
        error?.response?.data?.message ||
        "Failed to update profile. Please try again.";
      showErrorToast(message);
    },
  });

  const onSubmit = async (data) => {
    const updateData = {
      name: data.name,
      email: data.email,
    };

    // Only include password if it's provided
    if (data.password && data.password.trim()) {
      updateData.password = data.password;
    }

    updateProfileMutation.mutate(updateData);
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Failed to load profile data. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="fas fa-cog me-2"></i>
              Settings
            </h2>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Profile Picture and Basic Info */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {getUserInitials(currentUser?.name)}
              </div>
              <h4 className="mb-2">{currentUser?.name}</h4>
              <p className="text-muted mb-3">{currentUser?.email}</p>
              <span
                className={`badge fs-6 ${
                  currentUser?.role?.isAdmin
                    ? "bg-warning text-dark"
                    : "bg-secondary"
                }`}
              >
                <i
                  className={`fas ${
                    currentUser?.role?.isAdmin ? "fa-crown" : "fa-user"
                  } me-1`}
                ></i>
                {currentUser?.role?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="col-lg-8 col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-0">
              <h5 className="mb-0">
                <i className="fas fa-user-edit me-2"></i>
                Edit Profile Information
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {/* Full Name */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full Name *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-user text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        {...register("name")}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        {...register("email")}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Change Section */}
                  <div className="col-12 mb-3">
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Password Change:</strong> Leave password fields
                      empty if you don't want to change your password.
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        {...register("password")}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                        id="confirmPassword"
                        {...register("confirmPassword", {
                          validate: (value) => {
                            if (watchPassword && !value) {
                              return "Please confirm your password";
                            }
                            if (watchPassword && value !== watchPassword) {
                              return "Passwords do not match";
                            }
                            return true;
                          },
                        })}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <i
                          className={`fas ${
                            showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isDirty || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      reset({
                        name: currentUser?.name || "",
                        email: currentUser?.email || "",
                        password: "",
                        confirmPassword: "",
                      });
                    }}
                    disabled={isSubmitting}
                  >
                    <i className="fas fa-undo me-2"></i>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
