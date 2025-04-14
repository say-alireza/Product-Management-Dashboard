import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={label ? "mb-3" : ""}>
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

interface FormFileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  preview?: string[];
}

const FormFileInput: React.FC<FormFileInputProps> = ({
  label,
  error,
  preview,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="file"
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {preview && preview.length > 0 && (
        <div className="d-flex gap-2 mt-2 overflow-auto">
          {preview.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="img-thumbnail"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { FormInput, FormTextArea, FormFileInput };
