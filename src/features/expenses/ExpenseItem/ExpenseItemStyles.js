import styled from "styled-components";

export const ItemWrapper = styled.li`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 1.5rem;
  border-left: 6px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.875rem;
    color: #666;
  }
`;

export const RightColumn = styled.div`
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
`;

export const CategoryTag = styled.em`
  font-style: normal;         
  background-color: ${({ theme }) => theme.colors.primary}20; 
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px 8px;
  border-radius: 12px;
  user-select: none;
  display: inline-block;
  font-weight: 600;
  font-size: 0.85rem;
  margin-top: 4px;            
  text-transform: capitalize;  
`;    
