import { FlashI } from '../../../@types/interface';

import './style.scss';

function FlashMessage({ type, duration, children }: FlashI) {
  return (
    <div
      className={`Flash Flash--${type}`}
      style={{ animationDuration: `${duration ?? 3000}ms` }}
    >
      {children}
    </div>
  );
}

export default FlashMessage;
