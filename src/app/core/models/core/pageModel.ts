

export class PageModel {
    isActiveFilter: boolean
    isCheckAll: boolean;
    isCheckAll_Country: boolean;
    isCheckAll_Division: boolean;
    isCheckAll_District: boolean;
    isCheckAll_Upazila: boolean;
    isCheckAll_Thana: boolean;
    isCheckAll_Union: boolean;
    isCheckAll_Village: boolean;
    isCheckAll_Para: boolean;

    totalCountry: number;
    totalDivision: number;
    totalDistrict: number;
    totalUpazila: number;
    totalThana: number;
    totalUnion: number;
    totalVillage: number;
    totalPara: number;
    totalFile: number;

    totalCountryChecked: number;
    totalDivisionChecked: number;
    totalDistrictChecked: number;
    totalUpazilaChecked: number;
    totalThanaChecked: number;
    totalUnionChecked: number;
    totalVillageChecked: number;
    totalParaChecked: number;

    totalApplicationMigrationChecked: number;
    totalApplicationFileMasterChecked: number;

    type: number;
    applicationTypeID: number;
    IsMigrated: number;
}