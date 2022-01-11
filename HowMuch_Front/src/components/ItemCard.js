import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import noImage from "../img/noImage.svg";
import { BsFillCaretRightFill } from "react-icons/bs";
import { RiVipCrownFill } from "react-icons/ri";

const ItemCard = (props) => {
  // let tags = props.item.tagList;

  // let tagsArray = tags.split(",");
  // console.log(tagsArray);

  // tier reader
  const tierSelect = (point) => {
    if (point < 250) {
      // SetTier("Bronze");
      return "Bronze";
    } else if (point < 500) {
      // SetTier("Silver");
      return "Silver";
    } else if (point < 750) {
      // SetTier("Gold");
      return "Gold";
    } else if (point < 1000) {
      // SetTier("Platinum");
      return "Platinum";
    } else if (point >= 1000) {
      // SetTier("Diamond");
      return "Diamond";
    } else {
      return "Bronze";
    }
  };

  const tierObject = [
    { tier: "Diamond", color: "#548CFF" },
    { tier: "Platinum", color: "#00BDAA" },
    { tier: "Gold", color: "#FFE300" },
    { tier: "Silver", color: "#C8C2BC" },
    { tier: "Bronze", color: "#E26A2C" },
  ];

  const findTier = (userTier) => {
    console.log(userTier);

    let findItem = tierObject.find((item) => {
      return item.tier === userTier;
    });

    console.log(findItem);
    console.log(findItem.color);

    return findItem.color;
  };

  // findTier(tierSelect(포인트 데이터))
  // tier reader end

  return (
    <div style={{ margin: "20px auto", cursor: "pointer" }}>
      <Card style={{ width: "300px", color: "white", padding: "10px" }}>
        <Card.Img
          variant="top"
          src={
            props.item.imageList === null ? noImage : props.item.imageList[0]
          }
          style={{
            border: "2px solid #2D4059",
            width: "280px",
            height: "200px",
          }}
        />
        <Card.Body style={{ padding: "1rem 0" }}>
          <div style={{ display: "flex" }}>
            <Card.Title
              style={{
                width: "300px",
                height: "40px",
                textAlign: "left",
                backgroundColor: "#2D4059",
                borderRadius: "5px",
                padding: "10px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.item == null ? null : props.item.title}
            </Card.Title>
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                maxWidth: "300px",
                height: "40px",
                backgroundColor: "#2D4059",
                borderRadius: "5px",
                padding: "10px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.item == null ? null : (
                <span>
                  <RiVipCrownFill
                    color={findTier(tierSelect(props.item.point))}
                  />{" "}
                  {props.item.writer}
                </span>
              )}
            </p>
          </div>

          {/* <Card.Text
            style={{
              height: "150px",
              backgroundColor: "#2D4059",
              borderRadius: "5px",
              padding: "10px",
              overflow: "hidden",
            }}
          >
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                width: "70px",
                height: "40px",
                backgroundColor: "#2D4059",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "0",
              }}
            >
              제시가
            </p>
            <BsFillCaretRightFill
              style={{ color: "#EA5455", fontSize: "32px" }}
            />
            <div
              style={{
                color: "black",
                width: "250px",
                fontSize: "24px",
                borderBottom: "2px solid #2D4059",
              }}
            >
              {props.item == null
                ? null
                : props.item.suggestion
                ? props.item.suggestion + " 원"
                : "없음"}
            </div>
          </div>
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            {props.item == null
              ? null
              : props.item.tag === "not"
              ? null
              : props.item.tagList.map((item, index) => {
                  return (
                    <span
                      style={{
                        display: "inline-block",
                        maxWidth: "280px",
                        height: "40px",
                        backgroundColor: "#2D4059",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "0",
                        marginRight: "10px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                      key={index}
                    >
                      #{item}
                    </span>
                  );
                })}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemCard;
