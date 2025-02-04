// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;
contract compete {
   struct build {
    uint project_id;
    uint upvotes;
    string name;
    string techStack;
    string desc;
    string video_url;
    string github_id;
    address[] team;// first is the owner of the team
   }
   mapping (address => uint[]) userbuilds_map;
   struct hacakthon {
    uint hack_id;
    string title;
    string img_url;
    string desc;
    uint prizePool;
    string st_date;
    string end_date;
    string mode; 
   }
   uint hack_id=0;
   uint project_id=0;
   hacakthon[] public hackathons_arr;// we have created a hacakthon array
    mapping (uint=> uint[]) hack_map;// this contains the hackathon id
    build[] public build_arr;

    function registerHackathon(string memory _title,string memory _img_url,string memory _desc,uint  _prizePool,string memory _st_date,string memory _end_date,string memory _mode)  public {
        hackathons_arr.push(hacakthon(hack_id,_title,_img_url,_desc,_prizePool,_st_date,_end_date,_mode));
        hack_id++;
    }

    function allHackathons()public view returns(hacakthon[] memory){
        return hackathons_arr;
    }

    function createBuild(address _u,string memory _name,string memory _techStack,string memory _desc,string memory _video_url,string  memory _github_id,address[] memory _addresses) public  {
        build_arr[project_id]=build(
        project_id,
        0,
        _name,
        _techStack,
        _desc,
        _video_url,
        _github_id,
        _addresses
    );
    userbuilds_map[_u].push(project_id);
    project_id++;
    // now build created successfully
    }
    function submitbuild (uint _hack_id,uint _project_id) public {
        // for submitting build in my hacakthon project
        hack_map[_hack_id].push(_project_id);
    }

    function getallbuilds() public view returns(build[] memory ) {
        // for getting all builds
        uint len=userbuilds_map[msg.sender].length;
        build[] memory my_builds=new build[](len);
        for (uint i = 0; i <len; i++) {
            my_builds[i]=build_arr[userbuilds_map[msg.sender][i]];// push
        }
        return my_builds;
    }

    function get_hack_builds(uint _hack_id)public view  returns (build[] memory) {
        uint len=hack_map[_hack_id].length;
        build[] memory my_builds=new build[](len);
        for (uint i = 0; i < len; i++) {
            my_builds[i]=build_arr[hack_map[_hack_id][i]];
        }
        return my_builds;
    }
    public view 
    // we also have to store the login timehistory
}