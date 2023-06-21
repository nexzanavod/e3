const navigations = {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-dashboard",
    },
    {
      name: "Customers",
      url: "/customer",
      icon: "fa fa-user",
    },
    {
      name: "Customer Products",
      url: "/customer_products",
      icon: "fa fa-user",
    },
    {
      name: "Events",
      url: "/event",
      icon: "fa fa-check",
    },
    {
      name: "Segments",
      url: "/segments",
      icon: "fa fa-users",
    },
    {
      name: "Campaigns",
      url: "/campaigns",
      icon: "fa fa-bullhorn",
    },
    {
      name: "Reports",
      icon: "fa fa-bar-chart",
      children:[
        {
          name: "Log Reports",
          url: "/log-reports",
          icon: "fa fa-puzzle-piece",

        },
        {
          name: "Summary Reports",
          url: "/summary-reports",
          icon: "fa fa-puzzle-piece",

        },
     
      ]
    },
    // {
    //   name: "Messages",
    //   url: "/messages",
    //   icon: "fa fa-comments",
    // },
    // {
    //   name: "Automations",
    //   url: "/automations",
    //   icon: "fa fa-plug",
    // },
    // {
    //   name: "Configurations",
    //   url: "/configurations",
    //   icon: "fa fa-wrench",
    // },
    {
      name: "Users",
      url: "/users",
      icon: "fa fa-wrench",
    },

  ]
};

export default navigations;