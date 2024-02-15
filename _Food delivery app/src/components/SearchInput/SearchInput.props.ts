import { InputHTMLAttributes } from 'react';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isValid?: boolean
}