import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

const Button = ({
  children,
  to,
  tooltip,
  onClick,
  type,
  size,
  disabled,
  className,
  labelClassName,
  ...rest
}) => {
  const button = (
    <div
      className={`Button Button--${type} Button--${size} ${
        disabled ? 'is-disabled' : ''
      } ${className}`}
      data-tip={tooltip}
      onClick={disabled ? null : onClick}
      {...rest}
    >
      <h2 className={`Button-label ${labelClassName}`}>{children}</h2>
    </div>
  )
  return to ? (
    <a
      className="Button--link"
      href={to}
      rel="noopener noreferrer"
      target="_blank"
    >
      {button}
    </a>
  ) : (
    button
  )
}

Button.propTypes = {
  // State
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  tooltip: PropTypes.string,

  // Handlers
  onClick: PropTypes.func,

  // Modifiers
  type: PropTypes.oneOf(['primary', 'secondary', 'ternary']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string
}

Button.defaultProps = {
  // State
  to: null,
  tooltip: null,

  // Handlers
  onClick: null,

  // Modifiers
  type: 'primary',
  size: 'normal',
  disabled: false,
  className: '',
  labelClassName: ''
}

export default Button
