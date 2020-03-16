import Downshift from "downshift";
import React, { lazy, Suspense, useState } from "react";
import styled from "styled-components";

import Button from "#components/shared/Button";
import Loader from "#components/shared/Loader";
import firebaseApp from "#root/firebase";

const BecomeAdmin = lazy(() => import("./BecomeAdmin"));
const LocationStatus = lazy(() => import("./LocationStatus"));
const Map = lazy(() => import("./Map"));
const PlaceSuggestions = lazy(() => import("./PlaceSuggestions"));

const Buttons = styled.div`
  background-color: white;
  box-shadow: 0 0 5px #888888;
  bottom: 4rem;
  left: 50%;
  padding: 0.5rem;
  position: absolute;
  transform: translate(-50%);
  width: 15rem;
`;

const ButtonWrapper = styled.div`
  :not(:first-child) {
    margin-top: 0.25rem;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
`;

const LocationWrapper = styled.div`
  bottom: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
`;

const PlaceSuggestionsList = styled.ul`
  margin: 0;
  padding-inline-start: 0;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;

  :focus {
    outline: none;
  }
`;

const SearchWrapper = styled.div`
  background-color: white;
  box-shadow: 0 0 5px #888888;
  left: 50%;
  padding: 0.5rem;
  position: absolute;
  top: 4rem;
  transform: translate(-50%);
  width: 15rem;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Home = () => {
  const [placeId, setPlaceId] = useState(null);

  return (
    <Wrapper>
      <Content>
        <Map placeId={placeId} />
        <SearchWrapper>
          <Downshift
            itemToString={prediction =>
              prediction ? prediction.description : ""
            }
            onChange={prediction =>
              prediction ? setPlaceId(prediction.place_id) : setPlaceId(null)
            }
          >
            {({
              clearSelection,
              getInputProps,
              getItemProps,
              getMenuProps,
              isOpen,
              inputValue
            }) => (
              <div>
                <SearchInput
                  {...getInputProps()}
                  autoFocus
                  data-testid="search-input"
                  onBlur={() => {
                    !inputValue && clearSelection();
                  }}
                  placeholder="Search Google Maps"
                  type="text"
                />
                <Suspense fallback={<Loader />}>
                  <PlaceSuggestionsList
                    data-testid="suggestions-list"
                    {...getMenuProps()}
                  >
                    {isOpen ? (
                      <PlaceSuggestions
                        {...{
                          getItemProps,
                          inputValue
                        }}
                      />
                    ) : null}
                  </PlaceSuggestionsList>
                </Suspense>
              </div>
            )}
          </Downshift>
        </SearchWrapper>

        <Buttons>
          <ButtonWrapper>
            <BecomeAdmin />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button onClick={() => firebaseApp.auth().signOut()}>
              Sign Out
            </Button>
          </ButtonWrapper>
        </Buttons>
        <LocationWrapper>
          <LocationStatus />
        </LocationWrapper>
      </Content>
    </Wrapper>
  );
};

export default Home;
