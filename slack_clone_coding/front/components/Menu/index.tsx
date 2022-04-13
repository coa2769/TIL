import { CreateMenu, CloseModalButton } from '@components/Menu/styles';
import React, { CSSProperties, FC, PropsWithChildren, useCallback } from 'react';

// React의 propsTypes를 Typescirpt에서는 interface Props로 대신한다.
interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

//props를 넘겨줄 때 PropsWithChildren<Props> 가 필요하다.
//<PropsWithChildren<Props>>는 제네릭 문법이다.
const Menu: FC<PropsWithChildren<Props>> = ({ closeButton, style, show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  //부모를 클릭했을 때는 닫히게 (onCloseModal) 나 자신을 클릭했을 때는 그대로(stopPropagation)
  //stopPropagation는 부모에게로 전달될 이벤트를 막아준다.
  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};
Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
