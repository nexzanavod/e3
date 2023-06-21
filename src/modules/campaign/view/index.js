import React,{ useEffect }  from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation} from 'react-router';
import queryString from 'query-string';
import Page from '../../../components/Page'
import CampaignCreate from '../components/campaign-create'
import CampaignView from '../components/campaign-view'
import { useHistory } from 'react-router';
import { getUser } from '../../user/actions';


function Campaign({getUser,user}) {
  const history = useHistory();
  const {search} = useLocation();
  const {create} = queryString.parse(search)

  const object = JSON.parse(localStorage.getItem('auth'));
  const userId = object.id;

  useEffect(() => {
    getUser(userId);
  }, [getUser]);
  const createCampaign = () => {
    history.push({
        pathname: '/campaigns/create'
    })
  }

  const campaignsView = user?.permissions?.[0]?.campaigns?.view;
  const campaignsAdd = user?.permissions?.[0]?.campaigns?.add;



  const actions = [
    campaignsAdd && {
      label: "Create Campaign",
      action: createCampaign,
    }
  ].filter(Boolean);



  return (
    <Page title="Campaigns" actions={actions}>
        {create ? ( 
          <div className='d-flex justify-content-between' >
              <CampaignCreate />
          </div>
        ):(<CampaignView user={user} />)}
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {

    user: state.users.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUser
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);