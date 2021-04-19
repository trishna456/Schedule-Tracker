import React from 'react';
import ContactContext from '../../context/contact/ContactContext';
import { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Schedule = () => {
  const contactContext = useContext(ContactContext);
  const { setSlot, contacts, getContacts, loading } = contactContext;
  let bgColour = [];

  useEffect(() => {
    getContacts();

    //eslint-disable-next-line
  }, []);

  const time = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  const slotClicked = (e) => {
    console.log(e);
    const slot = e.target.parentNode.innerText.trim();
    slot === '9:00 AM' ||
    slot === '10:00 AM' ||
    slot === '11:00 AM' ||
    slot === '12:00 PM' ||
    slot === '1:00 PM' ||
    slot === '2:00 PM' ||
    slot === '3:00 PM' ||
    slot === '4:00 PM' ||
    slot === '5:00 PM'
      ? setSlot(slot)
      : console.log('do something else');
  };

  return (
    <Fragment>
      {time.map((slot) => {
        contacts.map((contact) => {
          contact.slot === slot
            ? (bgColour[time.indexOf(slot)] = true)
            : console.log();
        });
      })}
      <Link to='/contact'>
        <table className='table table-hover table-bordered' id='table1'>
          <tbody>
            {time.map((slot) => (
              <tr key={time.indexOf(slot)} onClick={slotClicked}>
                <td>{slot}</td>
                <td
                  className={bgColour[time.indexOf(slot)] ? 'table-danger' : ''}
                >
                  {contacts !== null && !loading ? (
                    contacts.map((contact) =>
                      contact.slot === slot ? (
                        <ContactItem key={contact._id} contact={contact} />
                      ) : (
                        ''
                      )
                    )
                  ) : (
                    <Spinner />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Link>
    </Fragment>
  );
  //   <Fragment>
  //     <TransitionGroup>
  //       {contacts.map((contact) => (
  //         <CSSTransition key={contact.id} timeout={500} classNames='item'>
  //           <ContactItem contact={contact} />
  //         </CSSTransition>
  //       ))}
  //     </TransitionGroup>
  //   </Fragment>
};

export default Schedule;
