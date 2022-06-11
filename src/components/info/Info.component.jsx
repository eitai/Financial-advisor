import React from "react";
import style from "./Info.module.scss";
import img from "../../assets/calculator-img.jpg";

const Info = () => {
  return (
    <div className={style.info}>
      <p className={style.headline}>תכנון בלה בלה, מוכנן ידה ידה</p>
      <div className={style.dots}>
        <div className={`${style.dotPurple}`}></div>
        <div className={`${style.dotPurple}`}></div>
        <div className={`${style.dotPurple}`}></div>
      </div>
      <div className={style.infoBox}>
        <div className={style.text}>
          אם בשלב הסקיצה העיצובית עדיין לא קיים הטקסט הרלוונטי, לא מומלץ למקם
          טקסט אמיתי אחר. הסיבה היא, כי בעת הצגת סקיצה עם טקסט אמיתי קריא, יתחיל
          הצופה לקרוא אוטומטית את הטקסט, ואם תוכן הטקסט לא רלוונטי לעבודה המוצגת
          - הדבר יסיח את דעתו מהעיצוב.
        </div>
        <img src={img} alt="calculator and pennis" className={style.img} />
      </div>

      <div className={style.dots}>
        <div className={`${style.dotRed} two`}></div>
        <div className={`${style.dotRed} two`}></div>
        <div className={`${style.dotRed} two`}></div>
      </div>
      <div className={style.infoBox}>
        <img src={img} alt="calculator and pennis" className={style.img} />
        <div className={style.text}>
          אם בשלב הסקיצה העיצובית עדיין לא קיים הטקסט הרלוונטי, לא מומלץ למקם
          טקסט אמיתי אחר. הסיבה היא, כי בעת הצגת סקיצה עם טקסט אמיתי קריא, יתחיל
          הצופה לקרוא אוטומטית את הטקסט, ואם תוכן הטקסט לא רלוונטי לעבודה המוצגת
          - הדבר יסיח את דעתו מהעיצוב.
        </div>
      </div>
    </div>
  );
};

export default Info;
