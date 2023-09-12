import { FC, memo } from 'react';
import { Photo } from '../../types/Photo';
import { PhotoItem } from '../PhotoItem/PhotoItem';

interface PhotoListProps {
  photos: Photo[];
}

export const PhotoList: FC<PhotoListProps> = memo(({ photos }) =>
  photos.map((photo) => <PhotoItem key={photo.id} photo={photo} />),
);
