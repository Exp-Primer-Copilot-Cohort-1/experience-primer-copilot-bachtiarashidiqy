function skillMember() {
  return {
    restirect: 'E',
    templateUrl: 'Modules/Skill/Views/member.html',
    controller: 'SkillMemberController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
        member: '='
     }
    };
  }
