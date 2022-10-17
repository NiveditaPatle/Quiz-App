import React, { useEffect, useState } from 'react'
import './quiz.css';
import axios from 'axios';


function Quiz() {

  const [currQue, setCurrQue] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowscore] = useState(false);
  // var val=0;
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const fetchData = () => {

    const URL1 = "https://api.ilmil.com/api/quiz";
    const URL2 = "https://api.ilmil.com/api/questions";
    const URL3 = "https://api.ilmil.com/api/qsoptions";




    const getQuizId = axios.get(URL1)
    const getQuestions = axios.get(URL2)
    const getOptions = axios.get(URL3)
      // currQue = data2.id
    axios.all([getQuizId, getQuestions, getOptions]).then(
      axios.spread((...allData) => {
        const allDataQuizId = allData[0]
        const allDataQuestions = allData[1]
        const allDataOptions = allData[2];

        setData1(allDataQuizId.data.data)
        setData2(allDataQuestions.data.data)
        setData3(allDataOptions.data.data)
      })
    )
  }

  useEffect(() => {
    fetchData()
  }, []);



  const handleAnsResp = (correct) => {
    console.log("correct", correct);

    if (correct === "Y") {
      setScore(score + 1);
      // val = val+1;
    }

    const nextQue = data2 + 1;
    if (nextQue < data2.length) {
      setData2(nextQue);
    }
    // else {
    //   setShowscore(true);
    // }
    console.log("score", score);
  }

  const resetQuiz = () => {
    setCurrQue(0);
    setScore(0);
    setShowscore(false);
  }



  return (
    <>

      <div>
        {showScore ? (
          <div className='score'>
            your score {score} out of {data2.length}
            <>
              <button type='submit' onClick={resetQuiz}>Restart Quiz</button>
            </>
          </div>
        )
          : (
            <>
              <div className='quetion'>
                <div className='que_num'>
                  <span>{currQue + 1}</span>/{data2.length}
                </div>

              </div>
              <div>

                {data2.map((item, id) => (

                  <div key={id}>
                    <div className='api_que'> <span className='que'>Que:-</span>{item.question}</div>
                    <div className='api_opt'>
                      {data3.map((item2, id) => {
                        if (item.id == item2.question_id) {
                          return <button key={id} className='ans_btn' onClick={() => handleAnsResp(item2.correct)}>{item2.option}</button>;
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>)}
      </div>







      {/* <div className='api_div'>
              
              {data2.map((item, id) => (   
              
                  <div className='que api_que' key={id}>
                  <span className='que'>Que:-</span> {item.question}
               
                 <div className='api_opt'>
                 {data3.map((item2, id)=>{
                     if(item.id == item2.question_id){
                      return <button key={id} className='ans_btn' onClick={()=>handleAnsResp(item2.correct)}>{item2.option}</button>;
                      
                     } 
                  })}
                 </div>
                         
                  </div>
              ) )}             
              <button onClick={getSubmit()}>Submit</button>         
            </div>  */}

    </>
  )

  //     var Questionbank = [
  //         {
  //             Question:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis sequi placeat ad?",
  //             AnswerText:[
  //                 {Answer:"opt11", isCorrect: true},
  //                 {Answer:"opt12", isCorrect: false},
  //                 {Answer:"opt13", isCorrect: false},
  //                 {Answer:"opt14", isCorrect: false}

  //             ]
  //         },
  //         {
  //             Question:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis sequi placeat ad?",
  //             AnswerText:[
  //                 {Answer:"opt21", isCorrect: false},
  //                 {Answer:"opt22", isCorrect: false},
  //                 {Answer:"opt23", isCorrect: true},
  //                 {Answer:"opt24", isCorrect: false}

  //             ]
  //         },
  //         {
  //             Question:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis sequi placeat ad?",
  //             AnswerText:[
  //                 {Answer:"opt31", isCorrect: false},
  //                 {Answer:"opt32", isCorrect: false},
  //                 {Answer:"opt33", isCorrect: false},
  //                 {Answer:"opt34", isCorrect: true}

  //             ]
  //         },
  //         {
  //             Question:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis sequi placeat ad?",
  //             AnswerText:[
  //                 {Answer:"opt41", isCorrect: false},
  //                 {Answer:"opt42", isCorrect: true},
  //                 {Answer:"opt43", isCorrect: false},
  //                 {Answer:"opt44", isCorrect: false}

  //             ]
  //         },
  //         {
  //             Question:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis sequi placeat ad?",
  //             AnswerText:[
  //                 {Answer:"opt51", isCorrect: false},
  //                 {Answer:"opt52", isCorrect: false},
  //                 {Answer:"opt53", isCorrect: false},
  //                 {Answer:"opt54", isCorrect: true}

  //             ]
  //         }
  //     ]

  //      const [currQue, setCurrQue] = useState(0);
  //      const [score, setScore] = useState(0);
  //      const [showScore, setShoscore] = useState(false);

  //      const handleAnsResp = (isCorrect)=>{
  //         if(isCorrect){
  //             setScore(score+1);
  //         }

  //         const nextQue = currQue+1;
  //         if (nextQue<Questionbank.length){
  //             setCurrQue(nextQue);
  //         }
  //         else{
  //             setShoscore(true);
  //         }
  //      }

  //      const resetQuiz=()=>{
  //         setCurrQue(0);
  //         setScore(0);
  //         setShoscore(false);
  //      }




  //   return (
  //     <div className='que_bank'>
  //       {showScore ? (
  //         <div className='score'>
  //             your score {score} out of {Questionbank.length}
  //             <>
  //                 <button type='submit' onClick={resetQuiz}>Restart Quiz</button>
  //             </>
  //         </div>
  //       )
  //       :(
  //        <>
  //        <div className='quetion'>
  //             <div className='que_num'>
  //                 <span>{currQue+1}</span>/{Questionbank.length}
  //             </div>
  //             <div className='que_text'>
  //             <span className='que'>Que {currQue+1}:</span> {Questionbank[currQue].Question}
  //             </div>
  //         </div>
  //         <div className='answer'>
  //             {Questionbank[currQue].AnswerText.map((Ans)=>
  //             (
  //                 <>
  //                 {/* <input type='radio'  onClick={()=>handleAnsResp(Ans.isCorrect)}/>
  //                 <label>{Ans.Answer}</label> */}
  //                 <button className='ans_btn' onClick={()=>handleAnsResp(Ans.isCorrect)}>{Ans.Answer}</button>
  //                 </>
  //             ))}
  //         </div>
  //        </>
  //       )}
  //     </div>
  //   )
}

export default Quiz



{/* {data3.map((item2)=>{
                    return item2.option;
                  }).filter((obj1)=>{
                    return data2.some((obj2)=>{
                      return obj1.question_id === obj2.id;
                    })
                  })} */}

{/* {data3.filter(function(obj1){
                    return data2.some(function(obj2){
                     // return obj1.question_id === obj2.id;
                     return data2.id === data3.question_id;
                    })
                  }).map((item2)=>(

                    <button>{data3.id}</button>
                  ))} */}