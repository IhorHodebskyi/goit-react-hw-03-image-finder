import { ButtonLoad } from './Bottun.styled';

export const Button = ({ onNextFetch }) => (
  <ButtonLoad type="button" onClick={onNextFetch}>
    Load more
  </ButtonLoad>
);
